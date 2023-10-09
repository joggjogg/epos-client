import React from 'react'
import './App.css'
import { Center, Container, Paper, Stack, Text, Title } from '@mantine/core'

const App = () => {
  return (
    <Center h={'100%'}>
      <Container size={420} my={40}>
        <Title ta="center" className="title">
          epos-client
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Client for ESC/POS printing from secure web applications
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack align="center">
            <Text size="sm" ta="center">
              Ready to print. You can close this window.
            </Text>
          </Stack>
        </Paper>
      </Container>
    </Center>
  )
}

export default App
