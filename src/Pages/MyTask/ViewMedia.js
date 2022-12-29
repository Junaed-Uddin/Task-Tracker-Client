import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ViewMedia = () => {
    const taskDetails = useLoaderData();
    const { taskName, desc, image, status } = taskDetails.data;

    return (
        <section>
            <h2 className='text-3xl text-violet-500 font-bold mt-8 ml-14'>View Media</h2>
            <div className="p-2 mx-auto dark:text-gray-100 sm:max-w-xl md:max-w-full lg:mx-5 rounded mt-4 md:px-10">
                <div className="overflow-x-auto">
                    <table className="w-full p-6 whitespace-nowrap text-center">
                        <thead>
                            <tr className="bg-white text-black border">
                                <th className="p-3">Images</th>
                                <th className="p-3">Task Name</th>
                                <th className="p-3">Task Description</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="border text-black text-center">
                            <tr className='border'>
                                <td className='py-2'>
                                    <div className='flex justify-center items-center'>
                                        <img className='rounded-full border w-24' src={image} alt="taskImage" />
                                    </div>
                                </td>
                                <td className="text-black">
                                    <p>{taskName}</p>
                                </td>
                                <td className="px-3 py-2">
                                    <p>{desc}</p>
                                </td>
                                <td className="px-3 py-2">
                                    {
                                        status === 'incomplete' ?
                                            <span className='px-2 text-sm py-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-500 text-white rounded'>{status}</span>
                                            :
                                            <span className='px-2 text-sm py-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded'>{status}</span>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ViewMedia;