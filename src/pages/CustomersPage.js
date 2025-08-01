import { useView } from '../contexts/ViewContext'
import { customers } from '../data/myObj'
import Cards from '../components/Cards'
import Table from '../components/Table'

export default function CustomersPage() {
    const { isCard } = useView()

    return (!isCard ? <Table customers={customers} /> : <Cards customers={customers} />)

}