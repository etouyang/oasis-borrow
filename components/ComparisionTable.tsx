import type { FC, ReactNode } from 'react'
import React from 'react'
import { Box } from 'theme-ui'

interface ComparisionTableProps {
  body: ReactNode[][]
  header: ReactNode[]
}

export const ComparisionTable: FC<ComparisionTableProps> = ({ body, header }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ pl: '50%', overflowX: 'scroll' }}>
        <Box as="table" sx={{ minWidth: '100%', borderSpacing: 0, borderCollapse: 'collapse' }}>
          <Box as="thead">
            <Box as="tr">
              {header.map((row, i) => (
                <Box
                  as="td"
                  sx={{
                    ...(i === 0 && {
                      position: 'absolute',
                      left: 0,
                      width: '50%',
                    }),
                  }}
                >
                  <Box sx={{ display: 'inline-block', bg: 'neutral10' }}>{row}</Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box as="tbody">
            {body.map((column) => (
              <Box as="tr">
                {column.map((row, i) => (
                  <Box
                    as="td"
                    sx={{
                      ...(i === 0 && {
                        position: 'absolute',
                        left: 0,
                        width: '50%',
                      }),
                    }}
                  >
                    <Box sx={{ display: 'inline-block', bg: 'neutral10' }}>{row}</Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
