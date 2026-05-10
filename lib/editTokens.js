import { randomBytes } from 'crypto'

const store = new Map()
const sessionIndex = new Map()

const EXPIRY_DAYS = 30

export async function saveSignature(sessionId, sig) {
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + EXPIRY_DAYS)

  const entry = {
    sessionId,
    sig,
    createdAt: new Date().toISOString(),
    expiresAt: expiresAt.toISOString(),
  }

  store.set(token, entry)
  sessionIndex.set(sessionId, token)

  return token
}

export async function getSignature(token) {
  const entry = store.get(token)
  if (!entry) return { error: 'Token not found' }
  if (new Date() > new Date(entry.expiresAt)) {
    return { error: 'This edit link has expired (30-day limit).' }
  }
  return { sig: entry.sig, expiresAt: entry.expiresAt }
}

export async function updateSignature(token, newSig) {
  const entry = store.get(token)
  if (!entry) return false
  store.set(token, { ...entry, sig: newSig, updatedAt: new Date().toISOString() })
  return true
}

export async function getSignatureBySession(sessionId) {
  const token = sessionIndex.get(sessionId)
  if (!token) return null
  const entry = store.get(token)
  if (!entry) return null
  if (new Date() > new Date(entry.expiresAt)) return null
  return { token, sig: entry.sig }
}