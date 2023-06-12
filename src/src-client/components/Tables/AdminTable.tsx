import SearchBar from "@components/generals/SeachBar";


const FILTER_TYPES = ['email', 'nombre']


const AdminTable = () => {
  const onSubmit = (inputSearch:string, filterBy?:string )=>{
    console.log('INPUT:', inputSearch);
    console.log('FILTER:', filterBy);
  }
  return (
    <>
      <section className="w-full">
        <SearchBar filterType={FILTER_TYPES} onSubmit={onSubmit} />
      </section>
    </>
  )
}

export default AdminTable
