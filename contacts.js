import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "/db/contacts.json");

const uuid = uuidv4();

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: uuid, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export { listContacts, getContactById, removeContact, addContact };
