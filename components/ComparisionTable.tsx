import type { FC, ReactNode } from 'react'
import React from 'react'
import { Box } from 'theme-ui'

interface ComparisionTableProps {
  body: ReactNode[][]
  header: ReactNode[]
}

export const ComparisionTable: FC<ComparisionTableProps> = ({ body, header }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        borderBottom: '1px solid',
        borderBottomColor: 'neutral20',
        bg: 'neutral10',
      }}
    >
      <Box sx={{ pl: '50%', overflowX: 'auto' }}>
        <Box as="table" sx={{ minWidth: '100%', borderSpacing: 0, borderCollapse: 'collapse' }}>
          <Box as="thead">
            <Box as="tr">
              {header.map((row, i) => (
                <Box
                  as="td"
                  variant="text.header5"
                  sx={{
                    ...(i === 0
                      ? {
                          position: 'absolute',
                          left: 0,
                          width: '50%',
                          pl: 4,
                          bg: 'neutral10',
                          zIndex: 2,
                        }
                      : { textAlign: 'center' }),
                    py: '24px',
                    color: 'neutral80',
                    borderBottom: '1px solid',
                    borderBottomColor: 'neutral20',
                  }}
                >
                  {row}
                </Box>
              ))}
            </Box>
          </Box>
          <Box as="tbody">
            {body.map((column) => (
              <Box
                as="tr"
                sx={{
                  ':first-of-type': {
                    td: { pt: 5 },
                  },
                  ':last-of-type': {
                    td: { pb: 5 },
                  },
                }}
              >
                {column.map((row, i) => (
                  <Box
                    as="td"
                    variant={i === 0 ? 'text.boldParagraph1' : 'text.paragraph1'}
                    sx={{
                      ...(i === 0
                        ? {
                            position: 'absolute',
                            left: 0,
                            width: '50%',
                            pl: 4,
                            bg: 'neutral10',
                            zIndex: 1,
                          }
                        : {
                            px: 4,
                            textAlign: 'center',
                          }),
                      py: 4,
                    }}
                  >
                    {row}
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
