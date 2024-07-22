/*!
 * SortMyTable - Biblioteca de ordenação de tabelas HTML
 * Desenvolvido por Target One
 * GitHub: https://github.com/targetone/SortMyTable
 */
class SortMyTable {
    constructor(table) {
        if (!table || !(table instanceof HTMLTableElement)) {
            throw new Error('Invalid table element');
        }

        this.table = table;
        this.headers = Array.from(this.table.querySelectorAll('th'));
        this.currentSorting = {};

        this.headers.forEach((header, index) => {
            if (!header.hasAttribute('data-sort-ignore')) {
                header.addEventListener('click', () => this.sortColumn(index));
            }
        });
    }

    sortColumn(index) {
        const header = this.headers[index];
        const isNumber = header.hasAttribute('data-is-number');
        const isDate = header.hasAttribute('data-is-date');
        const order = header.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';

        this.headers.forEach(h => h.removeAttribute('aria-sort'));
        header.setAttribute('aria-sort', order);

        const rows = Array.from(this.table.tBodies[0].rows);
        rows.sort((a, b) => this.compareCells(a.cells[index], b.cells[index], isNumber, isDate, order));

        rows.forEach(row => this.table.tBodies[0].appendChild(row));
        this.currentSorting = { index, order };
    }

    compareCells(cellA, cellB, isNumber, isDate, order) {
        const valueA = cellA.textContent.trim();
        const valueB = cellB.textContent.trim();

        if (isNumber) {
            const numA = this.parseNumber(valueA);
            const numB = this.parseNumber(valueB);
            return order === 'ascending' ? numA - numB : numB - numA;
        } else if (isDate) {
            const dateA = this.parseDate(valueA);
            const dateB = this.parseDate(valueB);
            return order === 'ascending' ? dateA - dateB : dateB - dateA;
        } else {
            return order === 'ascending' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
    }

    parseNumber(value) {
        // Remove qualquer caractere que não seja dígito, ponto, vírgula ou sinal de menos
        let cleanValue = value.replace(/[^0-9.,-]+/g, '').trim();
    
        // Se o valor contiver uma vírgula e um ponto, assumimos que é o formato americano (US$ 10,000.99)
        if (cleanValue.includes(',') && cleanValue.includes('.')) {
            cleanValue = cleanValue.replace(/,/g, ''); // Remove as vírgulas
        } else if (cleanValue.includes(',')) {
            // Se contiver apenas vírgulas, assumimos que é o formato europeu (R$ 4.321,64)
            cleanValue = cleanValue.replace(/\./g, '').replace(',', '.'); // Troca pontos por nada e vírgulas por pontos
        }
    
        const parsedValue = parseFloat(cleanValue);
    
        // Se o valor não for um número, retornamos 99999999999 para indicar texto puro
        return isNaN(parsedValue) ? 99999999999 : parsedValue;
    }

    parseDate(value) {
        // Lista de formatos comuns de datas e datetime
        const dateFormats = [
            { regex: /^\d{4}-\d{2}-\d{2}$/, parse: str => {
                const [year, month, day] = str.split('-');
                return new Date(year, month - 1, day);
            }}, // YYYY-MM-DD
            { regex: /^\d{2}\/\d{2}\/\d{4}$/, parse: str => {
                const [day, month, year] = str.split('/');
                return new Date(year, month - 1, day);
            }}, // DD/MM/YYYY
            { regex: /^\d{2}-\d{2}-\d{4}$/, parse: str => {
                const [day, month, year] = str.split('-');
                return new Date(year, month - 1, day);
            }}, // DD-MM-YYYY
            { regex: /^\d{4}\/\d{2}\/\d{2}$/, parse: str => {
                const [year, month, day] = str.split('/');
                return new Date(year, month - 1, day);
            }}, // YYYY/MM/DD
            { regex: /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/, parse: str => {
                const [date, time] = str.split(' ');
                const [day, month, year] = date.split('/');
                const [hours, minutes, seconds] = time.split(':');
                return new Date(year, month - 1, day, hours, minutes, seconds);
            }}, // DD/MM/YYYY HH:MM:SS
            { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, parse: str => new Date(str) }, // YYYY-MM-DDTHH:MM:SS
            { regex: /^\d{2} \w{3} \d{4}$/, parse: str => new Date(str) } // DD MMM YYYY
        ];
    
        // Tentar casar o valor com os formatos conhecidos
        for (let format of dateFormats) {
            if (format.regex.test(value)) {
                return format.parse(value);
            }
        }
    
        // Se não casar com nenhum formato, tentar parsear diretamente
        const parsedDate = new Date(value);
        return isNaN(parsedDate.getTime()) ? null : parsedDate;
    }

    getSortingConfiguration() {
        return this.currentSorting;
    }

    applySortingConfiguration(config) {
        if (config && typeof config.index === 'number' && config.order) {
            this.sortColumn(config.index);
            const header = this.headers[config.index];
            header.setAttribute('aria-sort', config.order);
        }
    }

    disableSorting() {
        this.headers.forEach(header => {
            const clone = header.cloneNode(true);
            header.parentNode.replaceChild(clone, header);
        });
    }
}