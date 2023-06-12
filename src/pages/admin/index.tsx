import AdminTable from "@/src-client/components/Tables/AdminTable";
import LayoutWithSideNav from "@/src-client/components/layouts/LayoutSideNav";
// const companies = useSelector((state: any) => state.AdminSlice.companies);
// const users = useSelector((state: any) => state.AdminSlice.users);

const Admin = () => {

	return (
      <LayoutWithSideNav>
        <AdminTable />
      </LayoutWithSideNav>
  )
};

export default Admin;
