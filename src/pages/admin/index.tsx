import AdminTable from '@components/Tables/AdminTable'
import LayoutWithSideNav from '@components/layouts/LayoutSideNav'
import { useValidationRoleAdmin } from '@hooks/use-validation-role-admin'

const Admin = () => {
  const { isAdmin, status } = useValidationRoleAdmin()
  if (status === 'authenticated' && isAdmin) {
    return (
      <LayoutWithSideNav>
        <AdminTable />
      </LayoutWithSideNav>
    )
  }
}

export default Admin
