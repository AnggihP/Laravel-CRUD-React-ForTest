import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Edit({ auth, sensor }) {

    const { data, setData, errors, put } = useForm({
        sensor: sensor.sensor || "",
        sensor_name: sensor.sensor_name || "",
        unit: sensor.unit || "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("sensor.update", sensor.id));
    }
    return (
        <AuthenticatedLayout
            user={auth.user} errors={auth.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Sensor</h2>}
        >
            <Head title="Sensor" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-end mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("sensor.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Sensor</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Sensor"
                                            name="sensor"
                                            value={data.sensor}
                                            onChange={(e) =>
                                                setData("sensor", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.sensor}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Sensor Name</label>
                                        <input
                                            type="text"
                                            className="w-full rounded"
                                            label="sensor_name"
                                            name="sensor_name"
                                            errors={errors.sensor_name}
                                            value={data.sensor_name}
                                            onChange={(e) =>
                                                setData("sensor_name", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.sensor_name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Unit</label>
                                        <input
                                            type="text"
                                            className="w-full rounded"
                                            label="unit"
                                            name="unit"
                                            errors={errors.unit}
                                            value={data.unit}
                                            onChange={(e) =>
                                                setData("unit", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.unit}
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
