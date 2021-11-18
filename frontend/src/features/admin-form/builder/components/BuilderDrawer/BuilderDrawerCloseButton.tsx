import { BiX } from 'react-icons/bi'
import { CloseButton } from '@chakra-ui/react'

import { useFormBuilder } from '../FormBuilderScreen/FormBuilderContext'

export const BuilderDrawerCloseButton = (): JSX.Element => {
  const { handleCloseDrawer } = useFormBuilder()
  return (
    <CloseButton
      zIndex={1}
      fontSize="1.5rem"
      w="1.5rem"
      h="1.5rem"
      variant="clear"
      colorScheme="neutral"
      children={<BiX />}
      onClick={handleCloseDrawer}
    />
  )
}
