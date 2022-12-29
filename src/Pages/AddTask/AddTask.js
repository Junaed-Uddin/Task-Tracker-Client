import React from 'react';
import { toast } from 'react-hot-toast';
import { AiFillFileAdd } from 'react-icons/ai';

const AddTask = () => {
    const imageKey = process.env.REACT_APP_SECRET_KEY;
    
    const handleTaskSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const taskName = form.addTask.value;
        const desc = form.taskDesc.value;
        const image = form.image.files[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${imageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    console.log(imageData);
                    const taskDetails = { taskName, desc, image: imageData.data.url, status: 'incomplete' };

                    fetch('http://localhost:8000/tasks', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(taskDetails)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.success) {
                                toast.success(data.message);
                                form.reset();
                            }
                            else {
                                toast.error(data.message);
                            }
                        })
                }
            })
    }

    return (
        <div className='w-full max-w-md mx-auto p-8 space-y-3 rounded-xl'>
            <div className='mt-10 mb-5'>
                <h2 className='text-2xl sm:text-3xl text-violet-500 font-bold text-center'>Add Your Daily Task</h2>
            </div>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:py-7 sm:px-7 bg-gray-50 text-gray-900'>
                <form onSubmit={handleTaskSubmit} className='space-y-6'>
                    <div className='space-y-4'>
                        <div>
                            <input
                                type='text'
                                name="addTask" placeholder="Add Task Name"
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:border-gray-900 text-gray-900' required
                            />
                        </div>

                        <div>
                            <input
                                type='text'
                                name="taskDesc" placeholder="Add Task Description"
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:border-gray-900 className= text-gray-900' required
                            />
                        </div>

                        <div>
                            <input
                                type="file" name='image' id='image' accept='image/*'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 bg-white className= focus:border-gray-900 text-gray-900' required
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <div>
                            <button type='submit' className='bg-violet-500 w-full flex justify-center items-center rounded-md py-2.5 px-3 text-white text-md shadow-md hover:bg-violet-700 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-500 active:shadow-lg transition duration-150 ease-in-out'>
                                <AiFillFileAdd></AiFillFileAdd>
                                <span className='px-1'>Add Task</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;