const Panel = ({children}) => {

    return (
        <div className="bg-zinc-800 w-full max-w-4xl p-10 rounded-md max-h-[90vh] flex flex-col">
            {children}
        </div>
    )
}

export default Panel;