# SortMyTable

SortMyTable é uma biblioteca JavaScript simples e eficaz para adicionar funcionalidade de ordenação a tabelas HTML. Suporta ordenação de colunas contendo números, datas e textos, com detecção automática de formatos. Fácil de integrar e personalizar.

## Funcionalidades

- Ordenação ascendente e descendente ao clicar nos cabeçalhos das colunas.
- Suporte para diferentes formatos de números e datas.
- Ignora colunas específicas conforme configuração.
- Métodos para obter e aplicar configurações de ordenação.
- Desativação da funcionalidade de ordenação, se necessário.
- Suporte a personalização de estilos CSS.

## Como Usar

### Inclusão da Biblioteca

Primeiro, inclua a biblioteca SortMyTable no seu projeto. Certifique-se de incluir também o Font Awesome para os ícones de ordenação.

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo SortMyTable</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Seu conteúdo aqui -->
    <script src="SortMyTable.js"></script>
</body>
</html>
```

### Estrutura da Tabela

Crie a tabela com os dados que você deseja ordenar. Utilize os atributos `data-is-number` e `data-is-date` para indicar colunas com números e datas, respectivamente. Use `data-sort-ignore` para colunas que não devem ser ordenáveis.

```html
<table id="myTable">
    <thead>
        <tr>
            <th>Nome</th>
            <th data-sort-ignore>Cargo</th>
            <th data-is-number>Salário</th>
            <th data-is-number>Idade</th>
            <th data-is-date>Data de Admissão</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>John Doe</td><td>Desenvolvedor</td><td>US$ 50,000.00</td><td>28</td><td>15/01/2018</td></tr>
        <tr><td>Jane Smith</td><td>Designer</td><td>US$ 60,000.50</td><td>34</td><td>23/08/2017</td></tr>
        <!-- Mais linhas aqui -->
    </tbody>
</table>
```

### Inicialização

Inicialize a biblioteca com o elemento da tabela:

```javascript
const tableSorter = new SortMyTable(document.getElementById('myTable'));
```

## Exemplo Completo

Aqui está um exemplo completo de uso básico:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo SortMyTable</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <script src="SortMyTable.js"></script>
</head>
<body>
    <h1>Demo SortMyTable</h1>
    <p>Clique nos cabeçalhos das colunas para ordenar a tabela.</p>

    <table id="myTable">
        <thead>
            <tr>
                <th>Nome</th>
                <th data-sort-ignore>Cargo</th>
                <th data-is-number>Salário</th>
                <th data-is-number>Idade</th>
                <th data-is-date>Data de Admissão</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>John Doe</td><td>Desenvolvedor</td><td>US$ 50,000.00</td><td>28</td><td>15/01/2018</td></tr>
            <tr><td>Jane Smith</td><td>Designer</td><td>US$ 60,000.50</td><td>34</td><td>23/08/2017</td></tr>
        </tbody>
    </table>

    <script>
        const tableSorter = new SortMyTable(document.getElementById('myTable'));
    </script>
</body>
</html>
```

## Funções Adicionais

### Obter Configuração Atual de Ordenação

```javascript
const currentConfig = tableSorter.getSortingConfiguration();
console.log(currentConfig);
```

### Aplicar Configuração de Ordenação

```javascript
tableSorter.applySortingConfiguration({ index: 2, order: 'ascending' });
```

### Desativar Ordenação

```javascript
tableSorter.disableSorting();
```

## Formatos Suportados

### Números

A função `parseNumber` pode identificar e converter diferentes formatos, incluindo:

- `R$ 4.321,64` (Formato brasileiro)
- `US$ 10,000.99` (Formato americano)
- `47%` (Porcentagem)
- `45` (Número puro)

Texto não numérico é convertido para `99999999999`.

### Datas

A função `parseDate` identifica e converte vários formatos de data, incluindo:

- `2024-07-19` (YYYY-MM-DD)
- `19/07/2024` (DD/MM/YYYY)
- `19-07-2024` (DD-MM-YYYY)
- `19 Julho 2024` (DD MMM YYYY)
- `2024/07/19` (YYYY/MM/DD)
- `2024-07-19T15:30:00` (YYYY-MM-DDTHH:MM:SS)

## Customizando o CSS

O CSS básico para a tabela está incluído diretamente no arquivo HTML. Você pode customizar os estilos editando o arquivo `style.css`:

```css
th[aria-sort]:after {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    position: absolute;
    margin-left: 10px;
    top: 50%;
    transform: translateY(-50%);
}

th[aria-sort="ascending"]:after {
    content: "\f0de"; /* Unicode para o ícone de ordenação ascendente */
}

th[aria-sort="descending"]:after {
    content: "\f0dd"; /* Unicode para o ícone de ordenação descendente */
}

th[data-sort-ignore] {
    cursor: default;
}
```

## Licença

Este projeto está licenciado sob a licença MIT.
