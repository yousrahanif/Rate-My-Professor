// import * as cheerio from 'cheerio';
// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function POST(req) {
//   const { url } = await req.json();

//   // Validate URL
//   if (!url.includes('ratemyprofessors.com')) {
//     return NextResponse.json({ error: 'Invalid URL. Please provide a Rate My Professor URL.' });
//   }

//   try {
//     const response = await axios.get(url);
//     const html = response.data;
//     const $ = cheerio.load(html);

//     // Extract professor's name
//     const name = $('div.NameTitle__Name-dowf0z-0 span').first().text().trim() + ' ' +
//                  $('div.NameTitle__Name-dowf0z-0 span.NameTitle__LastNameWrapper-dowf0z-2').text().trim();

//     return NextResponse.json({
//       success: true,
//       name: name || 'Name not available',
//     });
//   } catch (error) {
//     console.error('Error scraping data:', error);
//     return NextResponse.json({ error: 'Failed to scrape professor data.' });
//   }
// }

// import * as cheerio from 'cheerio';
// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function POST(req) {
//   const { url } = await req.json();

//   // Validate URL
//   if (!url.includes('ratemyprofessors.com')) {
//     return NextResponse.json({ error: 'Invalid URL. Please provide a Rate My Professor URL.' });
//   }

//   try {
//     const response = await axios.get(url);
//     const html = response.data;
//     const $ = cheerio.load(html);

//     // Extract professor's name
//     const name = $('div.NameTitle__Name-dowf0z-0 span').first().text().trim() + ' ' +
//                  $('div.NameTitle__Name-dowf0z-0 span.NameTitle__LastNameWrapper-dowf0z-2').text().trim();

//     // Extract professor's subject
//     const subject = $('div.NameTitle__Title-dowf0z-1 a').first().text().trim();

//     // Extract professor's school
//     const school = $('div.NameTitle__Title-dowf0z-1 a').last().text().trim();

//     // Extract rating and difficulty
//     const rating = $('div.RatingValue__Numerator-qw8sqy-2').first().text().trim();
//     const difficulty = $('div.FeedbackItem__FeedbackNumber-uof32n-1').last().text().trim();

//     return NextResponse.json({
//       success: true,
//       details: {
//         name: name || 'Name not available',
//         subject: subject || 'Subject not available',
//         school: school || 'School not available',
//         rating: rating || 'Rating not available',
//         difficulty: difficulty || 'Difficulty not available',
//         url: url
//       },
//     });
//   } catch (error) {
//     console.error('Error scraping data:', error);
//     return NextResponse.json({ error: 'Failed to scrape professor data.' });
//   }
// }


import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  const { url } = await req.json();

  // Validate URL
  if (!url.includes('ratemyprofessors.com')) {
    return NextResponse.json({ error: 'Invalid URL. Please provide a Rate My Professor URL.' });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract professor's name
    const name = $('div.NameTitle__Name-dowf0z-0 span').first().text().trim() + ' ' +
                 $('div.NameTitle__Name-dowf0z-0 span.NameTitle__LastNameWrapper-dowf0z-2').text().trim();

    // Extract professor's subject
    const subject = $('div.NameTitle__Title-dowf0z-1 a').first().text().trim();

    // Extract professor's school
    const school = $('div.NameTitle__Title-dowf0z-1 a').last().text().trim();

    // Extract rating and difficulty
    const rating = $('div.RatingValue__Numerator-qw8sqy-2').first().text().trim();
    const difficulty = $('div.FeedbackItem__FeedbackNumber-uof32n-1').last().text().trim();

    // Return the response without including the URL
    return NextResponse.json({
      success: true,
      details: {
        name: name || 'Name not available',
        subject: subject || 'Subject not available',
        school: school || 'School not available',
        rating: rating || 'Rating not available',
        difficulty: difficulty || 'Difficulty not available',
      },
    });
  } catch (error) {
    console.error('Error scraping data:', error);
    return NextResponse.json({ error: 'Failed to scrape professor data.' });
  }
}

