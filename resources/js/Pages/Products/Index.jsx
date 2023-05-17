import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable,{ createTheme } from 'react-data-table-component';

function ProductIndex({ auth }) {
    createTheme('solarized', {
        text: {
            primary: 'white',
            secondary: '#2aa198',
        },
        background: {
            default: '#002b36',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
        }, 'dark');

    const columns = [
        {
            name: 'Name',
            selector: row => row.name
        },
        {
            name:'Description',
            selector: row => row.description
        },
        {
            name : 'Price',
            selector: row => row. price
        },
        {
            name: 'Action',
            cell: (row) => (
                'edit | delete'
            )
        }
    ];

    const data = [
        {
            'id' : 1,
            'name':'Hp Xiaomy',
            'description' : 'HP XIAOMY',
            'price' : 11111
        }
    ]

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Product</h2>}
        >
            <Head title="Products" />

            <div className="py-12 dark:bg-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border-collapse">
                        <DataTable
                            columns={columns}
                            data={data}
                            theme='solarized'
                            pagination
                        ></DataTable>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    );
}

export default ProductIndex;
