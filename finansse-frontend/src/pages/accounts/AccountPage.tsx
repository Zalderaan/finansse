import { CreateAccountDialog } from '@/features/accounts/components/CreateAccountDialog'
import { Accounts } from '@/features/accounts/components/Accounts'

export function AccountPage() {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row w-full pb-4 justify-between'>
                <span className='font-normal text-2xl'>Your accounts</span>
                <CreateAccountDialog />
            </div>
            <Accounts />
        </div>
    )
}