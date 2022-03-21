import * as React from 'react';
import { useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Todolist = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            amount: 5000,
            division: 12,
        },
    });
    const [amount, setAmount] = React.useState(5000);
    const [division, setDivision] = React.useState(12);
    const [pageSize, setPageSize] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    function rounding(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }

    const onSubmit = data => {
        let rows = [];
        if (division > 0) {
            const quotient = rounding(amount / division);
            rows = Array.from({ length: division }, function (_, index) {
                return { id: index + 1, description: 'Rate', amount: quotient };
            });
        }
        setRows(rows);
    };

    function edit(currentRow) {
        setRows(() => {
            console.log(rows, 'ausgabe Rows');

            const test = rows.map(row => {
                if (currentRow.id === row.id) {
                    return { id: row.id, description: 'Rate123', amount: 100, manuell: true };
                }
                return row;
            });
            const manuellRow = test.filter(row => row.manuell);
            const newquotient = rounding(manuellRow / division);

            console.log(manuellRow, 'manuelle row');
            return test;
        });
    }

    const columns = useMemo(
        function () {
            return [
                { field: 'id', headerName: 'Monat', flex: 1 },
                { field: 'description', headerName: 'Beschreibung', flex: 1 },
                {
                    field: 'amount',
                    headerName: 'monatliche Rate',
                    type: 'number',
                    flex: 1,
                },
                {
                    field: 'actions',
                    type: 'actions',
                    width: 80,
                    getActions: row => [
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={() => {
                                edit(row);
                            }}
                        />,
                    ],
                },
            ];
        },
        [edit]
    );

    console.log(pageSize);

    return (
        <div>
            <h1> Calculator </h1>

            <Box onSubmit={handleSubmit(onSubmit)} component="form" p={1} mb={1} autoComplete="off">
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <Controller
                            name="amount"
                            control={control}
                            rules={{
                                validate: {
                                    positiveNumber: value => {
                                        console.log(parseInt(value));
                                        return parseInt(value) > 0 || 'Nur positive Zahlen erlaubt.';
                                    },
                                },
                                setValueAs: value => parseInt(value),
                            }}
                            render={props => {
                                const { field, fieldState } = props;
                                console.log(props);
                                return (
                                    <TextField
                                        {...field}
                                        label="Betrag"
                                        fullWidth
                                        size="small"
                                        error={fieldState.invalid}
                                        helperText={fieldState.error?.message}
                                    />
                                );
                            }}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Controller
                            name="division"
                            control={control}
                            render={({ field }) => <TextField {...field} label="Monate" fullWidth size="small" />}
                        />
                    </Grid>
                    <Grid display="flex" alignItems="center" item md={4} xs={12}>
                        <Button fullWidth variant="contained" type="submit">
                            Los geht´s!
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box p={1}>
                <DataGrid
                    autoHeight
                    rows={rows}
                    loading={rows.length === 0}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    onPageSizeChange={setPageSize}
                />

                <div>Summe aller Einzelbeträge</div>
                <div>{rows.reduce((partialSum, row) => partialSum + row.amount, 0)}</div>
            </Box>
        </div>
    );
};

export default Todolist;
