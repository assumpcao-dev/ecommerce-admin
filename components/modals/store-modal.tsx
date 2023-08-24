"use client"

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod'
import { useStoreModal } from "@/hooks/use-store-modal"
import { useState } from 'react';


import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { toast } from 'react-hot-toast';


const formSchema = z.object({
    name: z.string().min(1)
})


export const StoreModal = () => {

    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const StoreModal = useStoreModal();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // console.log(values)
        try {
            setLoading(true);

            // throw new Error("x")
            const response = await axios.post('/api/store', values);

            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error('Something went wrong.')
        } finally {
            setLoading(false)
        }
    }
    return (
        <Modal
            title="Create a store"
            description="Add a new store to manage products"
            isOpen={StoreModal.isOpen}
            onClose={StoreModal.onClose}
        >
            <div>
                <div className='space-y-4 py-4 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading}
                                                placeholder='E-Commerce' {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='pt-6 space-x-2 flex items-center justify-end'>
                                <Button
                                    disabled={loading}
                                    variant={'outline'}
                                    onClick={StoreModal.onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={loading}
                                    type='submit'
                                >
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}