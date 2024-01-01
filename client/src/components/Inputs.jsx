

import { useField, ErrorMessage } from "formik";



function TextInputField({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div className="w-full overflow-hidden max-w-xl flex max-sm:flex-col justify-between bg-white shadow-lg">
            {label ?
                <label htmlFor={props.name} className="text-xl flex items-center indent-4 w-full p-2 italic tracking-widest bg-teal-800 text-white break-keep">{label}</label>
                :
                null
            }

            <div className="flex flex-col w-full">
                <input {...field} {...props} />
                <ErrorMessage
                    component="p"
                    name={props.name}
                    className={"text-center bg-red-500 text-lg text-white p-2 font-bold"}
                />
            </div>
        </div>
    );
};


function TextAreaField({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <>
            <textarea className="h-auto w-full pl-2" {...field} {...props} />
            <ErrorMessage component="p" name={props.name} className={"text-center text-lg bg-red-500 text-white p-2 font-bold"} />
        </>
    );
};


function SelectField({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div className="w-full overflow-hidden max-w-xl flex max-sm:flex-col justify-between items-center shadow-lg">
            {label ?
                <label
                    htmlFor={props.name}
                    className="text-xl flex items-center indent-4 w-full p-2 italic tracking-widest bg-teal-800 text-white break-keep">
                    {label}
                </label>
                :
                null
            }
            <div className="flex flex-col w-full">
                <select {...field} {...props} >
                    {props.values.map((option, index) => {
                        return (
                            <option key={index} value={option.option}>{option.value}</option>
                        )
                    })}
                </select>
                <ErrorMessage component="p" name={props.name} className={"text-center text-lg bg-red-500 text-white p-2 font-bold"} />
            </div>
        </div>
    );
};


function CheckboxField({ label, ...props }) {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
        <div className="w-full rounded-xl overflow-hidden max-w-xl flex max-sm:flex-col justify-between bg-white shadow-lg">
            <label htmlFor={props.name} className="text-xl flex items-center indent-4 w-full p-2 italic tracking-widest bg-slate-800 text-white break-keep">
                {label}
            </label>
            <input {...field} {...props} checked={props.values} type="checkbox" />
            {meta.touched && meta.error ? (
                <div className="">{meta.error}</div>
            ) : null}
        </div>
    );
};



export default function UserInput({
    type,
    label,
    ...props
}) {

    switch (type) {
        case "email": return (<TextInputField label={label} {...props} type={type} />);
        case "text": return (<TextInputField label={label} {...props} type={type} />);
        case "password": return (<TextInputField label={label} {...props} type={type} />);
        case "text-area": return (<TextAreaField label={label} {...props} type={type} />);
        case "select": return (<SelectField label={label} {...props} type={type} />);
        case "checkbox": return (<CheckboxField label={label} {...props} type={type} />);
        default: return <></>
    }

}