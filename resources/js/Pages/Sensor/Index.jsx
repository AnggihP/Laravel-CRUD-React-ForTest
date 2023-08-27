import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default function Sensor({ auth, sensor }) {

    const userRole = auth.user.role;

    function destroy(e, id) {
        e.preventDefault(); 

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this sensor!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route("sensor.destroy", id));
                Swal.fire({
                    icon: 'success',
                    title: 'Data deleted!',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload();
            }
        });
    }
    return (
        <AuthenticatedLayout
            user={auth.user} errors={sensor.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Master Sensor</h2>}
        >
            <Head title="Sensor" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {userRole === 'superadmin' || userRole === 'admin' ? (
                                <div className="flex items-center justify-end mb-6">
                                    <Link className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none" href={route("sensor.create")}>Add Data</Link>
                                </div>
                            ) : null}
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">Sensor</th>
                                        <th className="px-4 py-2">Sensor Name</th>
                                        <th className="px-4 py-2">Unit</th>
                                        <th className="px-4 py-2">Created By</th>
                                        {userRole === 'superadmin' || userRole === 'admin' ? (
                                            <th className="px-4 py-2">Action</th>
                                        ) : null}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sensor.map(({ id, sensor, sensor_name, unit, created_by, deleted_at }) => (
                                        (userRole === 'superadmin' || (userRole === 'admin' && deleted_at === null) || (userRole === 'user' && deleted_at === null)) ? (
                                            <tr key={id}>
                                                <td className="border px-4 py-2">{sensor}</td>
                                                <td className="border px-4 py-2">{sensor_name}</td>
                                                <td className="border px-4 py-2">{unit}</td>
                                                <td className="border px-4 py-2">{created_by}</td>
                                                {/* Delete button (conditionally rendered) */}
                                                {userRole === 'superadmin' || userRole === 'admin' ? (
                                                    <td className="flex border px-4 py-2 justify-center">
                                                        <Link tabIndex="1" type="button" className="px-4 py-2 text-sm text-white bg-yellow-500 rounded" href={route("sensor.edit", id)}>Edit</Link>
                                                        <button onClick={(e) => destroy(e, id, userRole)} tabIndex="-1" type="button" className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded">Delete</button>
                                                    </td>
                                                ) : null}
                                            </tr>
                                        ) : null
                                    ))}
                                    {sensor.length === 0 && (
                                        <tr>
                                            <td className="px-6 py-4 border-t" colSpan="4">Data not found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
