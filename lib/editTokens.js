import { randomBytes, createHmac } from 'crypto'
import fs from 'fs/promises'
import path from 'path'
 
const STORE_FILE = path.join(process.cwd(), 'tmp', 'edit-tokens.json')
const EXPIRY_DAYS = 30
 
// Load the token store from disk
async function loadStore() {
  try {
    const data = await fs.readFile(STORE_FILE, 'utf8')
    return JSON.parse(data)
  } catch { return {} }
}
 
// Save the token store to disk
async function saveStore(store) {
  await fs.mkdir(path.dirname(STORE_FILE), { recursive: true })
  await fs.writeFile(STORE_FILE, JSON.stringify(store, null, 2))
}
 
// Create a new edit token for a session
export async function saveSignature(sessionId, sig) {
  const store = await loadStore()
 
  // Generate a cryptographically secure token
  const token = randomBytes(32).toString('hex')
 
  // Set expiry to 30 days from now
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + EXPIRY_DAYS)
 
  store[token] = {
    sessionId,
    sig,
    createdAt: new Date().toISOString(),
    expiresAt: expiresAt.toISOString(),
  }
 
  await saveStore(store)
  return token
}
 
// Retrieve signature data from a token
export async function getSignature(token) {

  const store = await loadStore()
  const entry = store[token]
 
  if (!entry) return { error: 'Token not found' }
 
  // Check expiry
  if (new Date() > new Date(entry.expiresAt)) {
    return { error: 'This edit link has expired (30-day limit).' }
  }
 
  return { sig: entry.sig, expiresAt: entry.expiresAt }
}
 
// Update a signature (for edits)
export async function updateSignature(token, newSig) {
  const store = await loadStore()
  if (!store[token]) return false
  store[token].sig = newSig
  store[token].updatedAt = new Date().toISOString()
  await saveStore(store)
  return true
}

// Look up a signature by session ID (used on success page)
export async function getSignatureBySession(sessionId) {
  const store = await loadStore()
 
  // Find the token entry that matches this session ID
  const entry = Object.entries(store).find(
    ([, val]) => val.sessionId === sessionId
  )
 
  if (!entry) return null
 
  const [token, data] = entry
 
  // Check expiry
  if (new Date() > new Date(data.expiresAt)) return null
 
  return { token, sig: data.sig }
}

