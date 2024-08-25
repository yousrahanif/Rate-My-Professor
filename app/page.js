// 'use client';
// import { Box, Button, Stack, TextField, useTheme } from '@mui/material';
// import { useState } from 'react';
// import ReactMarkdown from 'react-markdown';

// export default function Home() {
//   const theme = useTheme();
//   const [messages, setMessages] = useState([
//     {
//       role: 'assistant',
//       content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
//     },
//   ]);
//   const [message, setMessage] = useState('');
//   const [professorLink, setProfessorLink] = useState(''); // State to store the link

//   const sendMessage = async () => {
//     setMessage('');
//     setMessages((messages) => [
//       ...messages,
//       { role: 'user', content: message },
//       { role: 'assistant', content: '' },
//     ]);

//     const response = fetch('/api/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify([...messages, { role: 'user', content: message }]),
//     }).then(async (res) => {
//       const reader = res.body.getReader();
//       const decoder = new TextDecoder();
//       let result = '';

//       return reader.read().then(function processText({ done, value }) {
//         if (done) {
//           return result;
//         }
//         const text = decoder.decode(value || new Uint8Array(), { stream: true });
//         setMessages((messages) => {
//           let lastMessage = messages[messages.length - 1];
//           let otherMessages = messages.slice(0, messages.length - 1);
//           return [
//             ...otherMessages,
//             { ...lastMessage, content: lastMessage.content + text },
//           ];
//         });
//         return reader.read().then(processText);
//       });
//     });
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter' && !event.shiftKey) {
//       event.preventDefault();
//       sendMessage();
//     }
//   };

//   const handleSubmitLink = async () => {
//     if (professorLink) {
//       // POST the professor link to your API route to get the summary
//       try {
//         const response = await fetch('/api/web', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ url: professorLink }),
//         });

//         const result = await response.json();
//         console.log('API Response:', result); // Log the API response

//         if (result.success) {
//           console.log('Professor Name:', result.name); // Log the professor's name
//           setMessages((messages) => [
//             ...messages,
//             { role: 'assistant', content: `Name: ${result.name}` },
//           ]);
//         } else {
//           setMessages((messages) => [
//             ...messages,
//             { role: 'assistant', content: `Failed to retrieve the data. Please try again.` },
//           ]);
//         }
//       } catch (error) {
//         console.error('Error fetching professor data:', error);
//         setMessages((messages) => [
//           ...messages,
//           { role: 'assistant', content: `Failed to retrieve the data. Please try again.` },
//         ]);
//       }
//       setProfessorLink(''); // Clear the link input field
//     }
//   };

//   return (
//     <Box
//       width="100vw"
//       height="100vh"
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//       sx={{
//         backgroundImage: `url('pexels-photo-1007025.webp')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <Stack
//         direction={'column'}
//         width="500px"
//         height="700px"
//         border={`1px solid ${theme.palette.divider}`}
//         borderRadius={theme.shape.borderRadius}
//         boxShadow={3}
//         p={2}
//         spacing={3}
//         bgcolor={theme.palette.background.paper}
//       >
//         <Stack
//           direction={'column'}
//           spacing={2}
//           flexGrow={1}
//           overflow="auto"
//           maxHeight="100%"
//         >
//           {messages.map((message, index) => (
//             <Box
//               key={index}
//               display="flex"
//               justifyContent={
//                 message.role === 'assistant' ? 'flex-start' : 'flex-end'
//               }
//             >
//               <Box
//                 bgcolor={
//                   message.role === 'assistant'
//                     ? theme.palette.primary.main
//                     : theme.palette.secondary.main
//                 }
//                 color="white"
//                 borderRadius={16}
//                 p={3}
//                 boxShadow={2}
//               >
//                 <ReactMarkdown>{message.content}</ReactMarkdown>
//               </Box>
//             </Box>
//           ))}
//         </Stack>
//         <Stack direction={'row'} spacing={2}>
//           <TextField
//             label="Message"
//             fullWidth
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             variant="outlined"
//           />
//           <Button variant="contained" onClick={sendMessage}>
//             Send
//           </Button>
//         </Stack>
//         <Stack direction={'row'} spacing={2} mt={2}>
//           <TextField
//             label="Professor Link"
//             fullWidth
//             value={professorLink}
//             onChange={(e) => setProfessorLink(e.target.value)}
//             variant="outlined"
//           />
//           <Button variant="contained" onClick={handleSubmitLink}>
//             Get Summary
//           </Button>
//         </Stack>
//       </Stack>
//     </Box>
//   );
// }



'use client';
import { Box, Button, Stack, TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState('');
  const [professorLink, setProfessorLink] = useState(''); // State to store the link

  const sendMessage = async () => {
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    const response = fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleSubmitLink = async () => {
    if (professorLink) {
      try {
        const response = await fetch('/api/web', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: professorLink }),
        });

        const result = await response.json();
        console.log('API Response:', result); // Log the API response

        if (result.success) {
          setMessages((messages) => [
            ...messages,
            {
              role: 'assistant',
              content: [
                `**Name:** ${result.details.name}`,
                `**Subject:** ${result.details.subject}`,
                `**School:** ${result.details.school}`,
                `**Rating:** ${result.details.rating}`,
                `**Difficulty:** ${result.details.difficulty}`,
                `**URL:** ${result.details.url}`,
              ].join('\n'),
            },
          ]);
        } else {
          setMessages((messages) => [
            ...messages,
            { role: 'assistant', content: `Failed to retrieve the data. Please try again.` },
          ]);
        }
      } catch (error) {
        console.error('Error fetching professor data:', error);
        setMessages((messages) => [
          ...messages,
          { role: 'assistant', content: `Failed to retrieve the data. Please try again.` },
        ]);
      }
      setProfessorLink(''); // Clear the link input field
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: `url('pexels-photo-1007025.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Stack
        direction={'column'}
        width="500px"
        height="700px"
        border={`1px solid ${theme.palette.divider}`}
        borderRadius={theme.shape.borderRadius}
        boxShadow={3}
        p={2}
        spacing={3}
        bgcolor={theme.palette.background.paper}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main
                }
                color="white"
                borderRadius={16}
                p={3}
                boxShadow={2}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="outlined"
          />
          <Button variant="contained" onClick={sendMessage}>
          Fetch from Database
          </Button>
        </Stack>
        <Stack direction={'row'} spacing={2} mt={2}>
          <TextField
            label="Professor Link"
            fullWidth
            value={professorLink}
            onChange={(e) => setProfessorLink(e.target.value)}
            variant="outlined"
          />
          <Button variant="contained" onClick={handleSubmitLink}>
          Get Online Summary
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}


