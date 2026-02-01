export default function AddButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-green px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out bg-green-500 hover:bg-green-400 focus:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:bg-green-400 dark:bg-green-600 dark:text-white dark:hover:bg-green-500 dark:focus:bg-green-400 dark:focus:ring-offset-green-800 dark:active:bg-green-500 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
