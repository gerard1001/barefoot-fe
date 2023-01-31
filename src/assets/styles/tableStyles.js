import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/styles';
/* istanbul ignore next */
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  height: 10,
  '&:nth-child td, &:nth-child th': {
    borderBottom: `3px solid ${theme?.palette?.primary?.main}`,
  },
}));
/* istanbul ignore next */
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 12,
    backgroundColor: '#1A2D6D',
    color: '#fff',
    // color: theme?.palette?.common?.white,
    textTransform: 'uppercase',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '15px',
  },
}));
