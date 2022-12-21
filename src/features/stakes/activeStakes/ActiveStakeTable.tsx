import { CardContent } from '@material-ui/core';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useContext } from 'react';
import { StakeDataContext } from '../../../context/StakeDataContext';
import '../../../css/table.css';
import { ActiveStakeData } from '../../../utils/customTypes';
import { compactFormatter, fullFormatter, hexDayToLocalDateTime } from '../../../utils/hexHelpers';
import Progress from './Progress';
import { StakeActions } from './StakeActions';
import { StakeStatus } from './StakeStatus';
import { TextWithTooltip } from './TextWithTooltip';

const columnHelper = createColumnHelper<ActiveStakeData>();

export const ActiveStakeTable = () => {
    const ctx = useContext(StakeDataContext);
    const stakeData = ctx.stakeData;

    const columns = [
        columnHelper.accessor('index', {
            id: 'index',
            header: () => 'Index',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('id', {
            id: 'id',
            header: () => 'ID',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('start', {
            id: 'start',
            header: () => 'Start',
            cell: (info) => <TextWithTooltip title={hexDayToLocalDateTime(info.getValue())} text={info.getValue().toString()} align={'left'} />,
        }),
        columnHelper.accessor('end', {
            id: 'end',
            header: () => 'End',
            cell: (info) => <TextWithTooltip title={hexDayToLocalDateTime(info.getValue())} text={info.getValue().toString()} align={'left'} />,
        }),
        columnHelper.accessor('progress', {
            id: 'progress',
            header: () => 'Progress',
            cell: (props) => <Progress percent={props.row.getValue('progress')} />,
        }),
        columnHelper.accessor('principal', {
            id: 'principal',
            header: () => 'Principal',
            cell: (info) => <TextWithTooltip title={fullFormatter.format(info.getValue())} text={compactFormatter.format(info.getValue())} />,
        }),
        columnHelper.accessor('unlockedDay', {
            id: 'unlockedDay',
            header: () => 'Ended',
            cell: (info) => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: (props) => <StakeActions row={props.row} />,
        }),
        columnHelper.display({
            id: 'status',
            header: () => 'Status',
            cell: (props) => <StakeStatus row={props.row} />,
        }),
    ];

    const table = useReactTable({
        data: stakeData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        initialState: {
            columnVisibility: {
                index: false,
                id: false,
                unlockedDay: false,
            },
        },
    });

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <div>

                    <Typography variant="h5" component="div">
                        Stakes
                    </Typography>

                    {stakeData.length === 0 &&
                        <Typography variant="h6" component="div">
                            No Active Stakes Found.
                        </Typography>
                    }
                    {stakeData.length > 0 &&
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableCell key={header.id}>
                                                {header.isPlaceholder ?
                                                    null :
                                                    flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TableBody>
                                {table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                </div>
            </CardContent>
        </Card>
    );
};

export default ActiveStakeTable;
