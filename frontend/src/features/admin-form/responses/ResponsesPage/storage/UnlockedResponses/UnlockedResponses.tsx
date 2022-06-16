import { useMemo } from 'react'
import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/react'
import simplur from 'simplur'

import { DateRangeInput } from '~components/DatePicker/DateRangeInput'

import { useStorageResponsesContext } from '../StorageResponsesContext'

import { DownloadButton } from './DownloadButton'

export const UnlockedResponses = (): JSX.Element => {
  const { dateRange, setDateRange, totalResponsesCount } =
    useStorageResponsesContext()

  const prettifiedResponsesCount = useMemo(() => {
    if (!totalResponsesCount) return
    return simplur` ${[totalResponsesCount]}response[|s] to date`
  }, [totalResponsesCount])

  return (
    <Flex flexDir="column" h="100%">
      <Grid
        mb="1rem"
        alignItems="end"
        color="secondary.500"
        gridTemplateColumns={{ base: 'auto', md: 'auto 1fr' }}
        gridGap={{ base: '0.5rem', md: '1.5rem' }}
        gridTemplateAreas={{
          base: "'submissions submissions' 'export'",
          md: "'submissions export'",
        }}
      >
        <Box gridArea="submissions">
          <Text textStyle="h4">
            <Text as="span" color="primary.500">
              {totalResponsesCount?.toLocaleString()}
            </Text>
            {prettifiedResponsesCount}
          </Text>
        </Box>
        <Stack direction="row" gridArea="export" justifySelf="end">
          <DateRangeInput value={dateRange} onChange={setDateRange} />
          <DownloadButton />
        </Stack>
      </Grid>
    </Flex>
  )
}
