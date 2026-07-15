import type {JSX} from 'react';

function FoodCardSkeleton(): JSX.Element {
    return (
        <div className="grid grid-cols-[100px_2fr_1fr] items-stretch md:grid-cols-none md:grid-rows md:gap-4 md:pb-4 gap-x-5 p-2 animate-pulse w-full">
            <div className="aspect-[4/3] w-full md:rounded-none md:rounded-t-lg rounded-3xl bg-gray-300"/>
            <div className="flex flex-col gap-2">
                <div className="bg-gray-300 rounded-lg h-6 w-3/4"/>
                <div className="space-y-2">
                    <div className="bg-gray-300 w-full h-5 rounded-lg"/>
                    <div className="bg-gray-300 w-1/2 h-5 rounded-lg"/>
                </div>
                <div className="rounded-lg bg-gray-300 h-6 w-1/4"/>
            </div>
            <div className="bg-gray-300 w-10 h-10 md:w-15 rounded-lg justify-self-end self-center"/>
        </div>
    );
}

export default FoodCardSkeleton;