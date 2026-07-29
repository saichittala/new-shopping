import Widgets from './widgets'
import Copyright from './copyright'
import { footer } from './data'
const { widgets, payment } = footer

const Footer: React.FC = () => (
  <footer className="site-footer">
    <Widgets widgets={widgets} />
    <Copyright payment={payment} />
  </footer>
)

export default Footer
