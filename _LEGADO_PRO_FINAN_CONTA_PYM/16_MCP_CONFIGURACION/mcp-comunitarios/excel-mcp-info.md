# Excel MCP Server

[Excel Server MCP server](https://glama.ai/mcp/servers/@negokaz/excel-mcp-server)
[NPM Version](https://www.npmjs.com/package/@negokaz/excel-mcp-server) [smithery badge](https://smithery.ai/server/@negokaz/excel-mcp-server)

A Model Context Protocol (MCP) server that reads and writes MS Excel data.

## Features

• Read/Write text values
• Read/Write formulas
• Create new sheets

🪟Windows only:
• Live editing
• Capture screen image from a sheet

For more details, see the tools section.

## Requirements

• Node.js 20.x or later

## Supported file formats

• xlsx (Excel book)
• xlsm (Excel macro-enabled book)
• xltx (Excel template)
• xltm (Excel macro-enabled template)

## Installation

### Installing via NPM

excel-mcp-server is automatically installed by adding the following
configuration to the MCP servers configuration.

For Windows:

  {
    "mcpServers": {
        "excel": {
            "command": "cmd",
            "args": ["/c", "npx", "--yes", "@negokaz/excel-mcp-server"],
            "env": {
                "EXCEL_MCP_PAGING_CELLS_LIMIT": "4000"
            }
        }
    }
}
For other platforms:

  {
    "mcpServers": {
        "excel": {
            "command": "npx",
            "args": ["--yes", "@negokaz/excel-mcp-server"],
            "env": {
                "EXCEL_MCP_PAGING_CELLS_LIMIT": "4000"
            }
        }
    }
}

### Installing via Smithery

To install Excel MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@negokaz/excel-mcp-server):

  npx -y @smithery/cli install @negokaz/excel-mcp-server --client claude

## Tools

### `excel_describe_sheets`

List all sheet information of specified Excel file.

Arguments:
• `fileAbsolutePath`: Absolute path to the Excel file

### `excel_read_sheet`

Read values from Excel sheet with pagination.

Arguments:
• `fileAbsolutePath`: Absolute path to the Excel file
• `sheetName`: Sheet name in the Excel file
• `range`: Range of cells to read in the Excel sheet (e.g., "A1:C10"). [default: first paging range]
• `showFormula`: Show formula instead of value [default: false]
• `showStyle`: Show style information for cells [default: false]

### `excel_screen_capture`

[Windows only] Take a screenshot of the Excel sheet with pagination.

Arguments:
• `fileAbsolutePath`: Absolute path to the Excel file
• `sheetName`: Sheet name in the Excel file
• `range`: Range of cells to read in the Excel sheet (e.g., "A1:C10"). [default: first paging range]

### `excel_write_to_sheet`

Write values to the Excel sheet.

Arguments:
• `fileAbsolutePath`: Absolute path to the Excel file
• `sheetName`: Sheet name in the Excel file
• `newSheet`: Create a new sheet if true, otherwise write to the existing sheet
• `range`: Range of cells to read in the Excel sheet (e.g., "A1:C10").
• `values`: Values to write to the Excel sheet. If the value is a formula, it should start with "="

### `excel_create_table`

Create a table in the Excel sheet

Arguments:
• `fileAbsolutePath`: Absolute path to the Excel file
• `sheetName`: Sheet name where the table is created
• `range`: Range to be a table (e.g., "A1:C10")
• `tableName`: Table name to be created

### `excel_copy_sheet`

Copy existing sheet to a new sheet

Arguments:
• `fileAbsolutePath`: Absolute path to the Excel file
• `srcSheetName`: Source sheet name in the Excel file
• `dstSheetName`: Sheet name to be copied

### `excel_format_range`

Format cells in the Excel sheet with style information

Arguments:
• `fileAbsolutePath`: Absolute path to the Excel file
• `sheetName`: Sheet name in the Excel file
• `range`: Range of cells in the Excel sheet (e.g., "A1:C3")
• `styles`: 2D array of style objects for each cell. If a cell does not change style, use null. The number of items of the array must match the range size.
  ◦ Style object properties:
   ■ `border`: Array of border styles (type, color, style)
   ■ `font`: Font styling (bold, italic, underline, size, strike, color, vertAlign)
   ■ `fill`: Fill/background styling (type, pattern, color, shading)
   ■ `numFmt`: Custom number format string
   ■ `decimalPlaces`: Number of decimal places (0-30)

## Configuration

You can change the MCP Server behaviors by the following environment variables:

### `EXCEL_MCP_PAGING_CELLS_LIMIT`

The maximum number of cells to read in a single paging operation.[default: 4000]

## License

Copyright (c) 2025 Kazuki Negoro
excel-mcp-server is released under the [MIT License](https://github.com/negokaz/excel-mcp-server/blob/main/LICENSE)
