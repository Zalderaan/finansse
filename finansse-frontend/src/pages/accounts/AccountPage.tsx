import { Button } from '@/components/ui/button'
import { CreateAccountModal } from '@/features/accounts/components/CreateAccountModal'
import { Plus } from 'lucide-react'

export function AccountPage() {
    return (
        <>
            Hello from Accounts Page!
            <CreateAccountModal></CreateAccountModal>
        </>
    )
}