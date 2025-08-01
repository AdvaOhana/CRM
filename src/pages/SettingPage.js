import { useView } from '../contexts/ViewContext'
import Button from '../components/Button'

export default function SettingPage() {
    const { isCard, toggleView } = useView()
    return (<div>
        <Button onClick={toggleView}>Show as {!isCard ? 'card' : 'table'}</Button>
    </div>)
}