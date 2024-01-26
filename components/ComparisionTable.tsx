import { Icon } from 'components/Icon'
import type { FC, ReactNode } from 'react'
import React from 'react'
import { checkmark, close } from 'theme/icons'
import { Box, Flex } from 'theme-ui'

interface ComparisionTableIconProps {
  type: 'positive' | 'negative'
}

interface ComparisionTableProps {
  body: ReactNode[][]
  header: ReactNode[]
}

export const ComparisionTableIcon: FC<ComparisionTableIconProps> = ({ type }) => {
  return (
    <Flex
      sx={{
        display: 'inline-flex',
        width: '40px',
        height: '40px',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'ellipse',
        bg: type === 'positive' ? 'interactive10' : 'critical10',
      }}
    >
      {type === 'positive' ? (
        <Icon icon={checkmark} color="interactive100" size="16px" />
      ) : (
        <Icon icon={close} color="critical100" size="12px" />
      )}
    </Flex>
  )
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
                          textAlign: 'left',
                        }
                      : { textAlign: 'center' }),
                    py: '24px',
                    color: 'neutral80',
                    borderBottom: '1px solid',
                    borderBottomColor: 'neutral20',
                    img: {
                      maxHeight: 4,
                      verticalAlign: 'bottom',
                    },
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
                            textAlign: 'left',
                          }
                        : {
                            // px: 4,
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
