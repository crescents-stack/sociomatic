"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Form
} from "@/components/ui/form"
import CustomInput from "@/app/joining/_utils/custom-input"
import Link from "next/link"
import { Sun } from "lucide-react"
import ShimmerButton from "@/components/magicui/shimmer-button"

const FormSchema = z.object({
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})


const LoginForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },

    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast.success("You submitted the following values:", {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">

                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <div className="flex justify-center items-start py-16 h-screen">
            <div className="max-w-[520px] w-full mx-auto px-10 py-8 rounded-[32px] shadow-xl bg-white border space-y-6">

                <h3 className="text-2xl font-semibold">Sign in to your account</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <CustomInput form={form} name="email" label="Email" />

                        <CustomInput form={form} name="password" label="Password" type="password" />
                        <Link href="/forget-password" className="inline-block w-full text-right">Forget Password?</Link>
                        <ShimmerButton type="submit"
                            disabled={form.formState.isSubmitting}
                            className="w-full items-center gap-2">
                            {form.formState.isSubmitting ? (
                                <Sun className="w-4 h-4 animate-spin" />
                            ) : null}
                            {form.formState.isSubmitting ? "Submiting" : "Submit"}
                        </ShimmerButton>
                    </form>

                </Form>
                <div>
                    <p>New to the Sociomatic? <Link href="/register" className="text-primary underline">Create an account</Link></p>
                </div>
            </div>
        </div>

    )
}

export default LoginForm;
