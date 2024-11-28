
import { cva, VariantProps } from "class-variance-authority"  // becoz we need to apply different types of styles on button 
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge" // to make sure not conflicts style not get overide

const buttonStyles = cva(["transition-colors"],{
    variants:{
        variant:{
            default:["bg-secondary-Default","hover:bg-secondary-hover"],
            ghost:["hover:bg-gray-100"]
        },
        size:{
            default:["rounded","p-2"],
            icon:[
                "rounded-full",
                "h-10",
                "w-10",
                "flex",
                "justify-center",
                "items-center",
                "p-2.5"
            ],
        }
    },
    defaultVariants:{     // if dont pass props it uses default
        variant:"default",
        size:"default"
    }
})

//  const classes = buttonStyles({size:"icon"})

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">  //VariantProps if part of cva

function Button({variant,size,className,...props}:ButtonProps){

    return <button {...props} className={twMerge(buttonStyles({variant,size}),className) }/>
}

export default Button