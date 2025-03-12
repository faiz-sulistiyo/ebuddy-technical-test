"use client"
import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import TablePagination from "@mui/material/TablePagination"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import {Button} from "@mui/material"

export interface Column<T> {
  id: keyof T
  label: string
  align?: "right" | "left" | "center"
  type?: "date" | "text" | "action"
}

interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  page: number
  rowsPerPage: number
  totalRows: number
  loading?: boolean
  onEdit: (row: T) => void
  onDelete: (row: T) => void
  onPageChange: (page: number) => void
  onRowPerPageChange: (rowsPerPage: number) => void
}

const renderCell = <T,>(
  row: T,
  column: Column<T>,
  onEdit: (row: T) => void,
  onDelete: (row: T) => void,
) => {
  const value = row[column.id]

  if (column.type === "date" && typeof value === "number") {
    return new Date(value).toLocaleString(undefined, {
      year: "numeric",
      month: "short", // Use "long" for full month name
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  if (column.type === "action") {
    return (
      <>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={() => onEdit(row)}
          sx={{mr: 1}}
        >
          Edit
        </Button>
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={() => onDelete(row)}
        >
          Delete
        </Button>
      </>
    )
  }

  if (typeof value === "string" || typeof value === "number") {
    return value
  }

  return String(value) // Fallback for non-string, non-number values
}

export default function DataTable<T>({
  columns,
  rows,
  page,
  rowsPerPage,
  totalRows,
  loading,
  onEdit,
  onDelete,
  onPageChange,
  onRowPerPageChange,
}: DataTableProps<T>) {
  return (
    <TableContainer component={Paper}>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={200}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Table sx={{minWidth: 650}} aria-label="custom table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.label} align={column.align || "left"}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.label} align={column.align || "left"}>
                    {renderCell(row, column, onEdit, onDelete)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <TablePagination
        component="div"
        count={totalRows}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, page) => onPageChange(page + 1)}
        onRowsPerPageChange={(e) =>
          onRowPerPageChange(parseInt(e.target.value, 10))
        }
      />
    </TableContainer>
  )
}
