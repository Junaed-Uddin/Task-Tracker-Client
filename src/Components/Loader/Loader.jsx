
const Loader = () => {
    return (
        <div className="flex justify-center items-center mt-10">
            <div className="relative w-16 h-16 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-100 rounded-full border-2 border-white"></div>
            </div>
        </div>
    );
};

export default Loader;