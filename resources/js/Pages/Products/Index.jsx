import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DataTable,{ createTheme } from 'react-data-table-component';
import axios from 'axios';

function ProductIndex({ product, auth }) {
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

    const [users, setUsers] = useState({});
    const [userTotal, setUserTotal] = useState()
    const [page, setPage] = useState(1);
    const countPerPage = 10;

    const getUserList = (filter) => {
        console.log(filter)
        axios.get(route('products.getData',[page, countPerPage,filter])).then(res => {
            setUsers(res.data.data)
            setUserTotal(res.data.total)
        }).catch(err =>{
            setUsers({});
        });
    }

    useEffect(() => {
        getUserList();
    }, [page]);

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable :true
        },
        {
            name:'Description',
            selector: row => row.description,
            sortable :true
        },
        {
            name : 'Price',
            selector: row => row. price,
            sortable :true
        },
        {
            name: 'Action',
            cell: (row) => (
                'edit | delete'
            )
        }
    ];

    const data = users;

    const [records, setRecords] = useState(users)

    function handleFilter(event){
        getUserList(event.target.value.toLowerCase());
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Product</h2>}
        >
            <Head title="Products" />
            <div className="py-12 dark:bg-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-end mb-3 mr-1">
                        <NavLink href={route('products.create')}>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-3 mr-1">
                            Create
                        </button>
                        </NavLink><br />
                        <input className='mr-1' type="text" placeholder='search' onChange={handleFilter} />
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border-collapse">
                        <DataTable
                            columns={columns}
                            theme='solarized'
                            data={data}
                            fixedHeader
                            highlightOnHover
                            pagination
                            paginationServer
                            paginationTotalRows={userTotal}
                            paginationPerPage={countPerPage}
                            paginationComponentOptions={{
                                noRowsPerPage: true
                            }}
                            onChangePage={page => setPage(page)}
                        ></DataTable>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    );
}

export default ProductIndex;
