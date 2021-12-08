// imports
import { sendMail } from '@bobthered/nodemailer';
import _dotenv from 'dotenv/config';
import handlebars from 'handlebars';
import { promises as fs } from 'fs';

const getTemplate = async template => {
  const html = await fs.readFile('./src/emailTemplates/' + template, { encoding: 'utf-8' });
  return html;
}

const handlebarsReplace = (html, replacements) => {
  const template = handlebars.compile(html);
  const replacedHtml = template(replacements);

  return replacedHtml;
}

export default async options => {
  // initiate defaults
  const defaults = {
    from: process.env.NODEMAILER_FROM,
    subject: 'Test Subject',
    to: 'bobmcalevey@gmail.com'
  };

  // merge options
  options = Object.assign(defaults, options);

  // destructure options
  const { replacements, template, ...mailOptions } = options;

  // get template html
  const templateHtml = await getTemplate(template);

  // get final html
  const html = handlebarsReplace(templateHtml, replacements);

  await sendMail({
    ...mailOptions,
    html
  });
}