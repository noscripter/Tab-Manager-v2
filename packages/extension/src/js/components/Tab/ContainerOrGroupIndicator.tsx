import { observer } from 'mobx-react-lite'

let ContainerOrGroupIndicator = (): React.ReactNode => null

if (process.env.TARGET_BROWSER === 'firefox') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ContainerOrGroupIndicator = observer(require('./_ContainerIndicator').default)
}

if (process.env.TARGET_BROWSER === 'chrome') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ContainerOrGroupIndicator = observer(require('./_TabGroupIndicator').default)
}

export default ContainerOrGroupIndicator
