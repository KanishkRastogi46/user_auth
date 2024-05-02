export default function Profile({params}:any){
    return(
        <>
            <div className="w-screen h-[90vh] flex justify-center items-center text-5xl font-normal">
                <span className="uppercase">Username: <span className="font-semibold bg-orange-50">{params.id}</span></span>
            </div>
        </>
    )
}