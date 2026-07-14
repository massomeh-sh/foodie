import type {JSX} from 'react';

function FoodCardSkeleton(): JSX.Element {
    return (
        <div className="grid grid-cols-[100px_2fr_1fr] gap-x-5 p-2 animate-pulse">
            <div className="w-30 h-30 rounded-3xl bg-gray-300"/>
            <div className="flex flex-col gap-2 mt-4">
                <div className="bg-gray-300 rounded-lg h-6 w-3/4"/>
                <div className="space-y-2">
                    <div className="bg-gray-300 w-full h-5 rounded-lg"/>
                    <div className="bg-gray-300 w-1/2 h-5 rounded-lg"/>
                </div>
                <div className="rounded-lg bg-gray-300 h-6 w-1/4"/>
            </div>
            <div className="bg-gray-300 w-10 h-10 rounded-lg justify-self-end self-center"/>
        </div>
    );
}

export default FoodCardSkeleton;