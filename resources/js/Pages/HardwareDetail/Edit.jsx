import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import 'react-datepicker/dist/react-datepicker.css';

export default function Edit({ auth, hardware_detail }) {

    const { data, setData, errors, put } = useForm({
        hardware: hardware_detail.hardware || "",
        sensor: hardware_detail.sensor || "",
    });


    function handleSubmit(e) {
        e.preventDefault();
        put(route("hardware_detail.update", hardware_detail.id));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Detail Hardware</h2>}
        >
            <Head title="Hardware Detail" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-end mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("hardware_detail.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Hardware</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="hardware"
                                            name="hardware"
                                            value={data.hardware}
                                            onChange={(e) =>
                                                setData("hardware", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.hardware}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Sensor</label>
                                        <input
                                            type="text"
                                            className="w-full rounded"
                                            label="sensor"
                                            name="sensor"
                                            errors={errors.sensor}
                                            value={data.sensor}
                                            onChange={(e) =>
                                                setData("sensor", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.sensor}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex mt-4 justify-end">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout >
    )
}
