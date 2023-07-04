import axios from 'axios'
import { NextFunction, Request, Response } from 'express'

import { config } from '../config'
import { Player } from '../database'

export const AuthController = {
  Validate: async (req: any, res: Response, next: NextFunction) => {
    if (!req.query.code) return res.json({ message: 'No code provided' })
    if (!req.query.state)
      return res.json({
        message:
          'Please request a new link from Discord by using /register - this link does not contain your Discord UserID',
      })

    axios
      .post(
        'https://discord.com/api/v7/oauth2/token',
        {
          client_id: config.discord.clientId,
          client_secret: config.discord.clientSecret,
          code: req.query.code,
          grant_type: 'authorization_code',
          redirect_uri: `http://${config.host}:${config.port}`,
          scope: 'identify connections',
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then(({ data, status }) => {
        if (status !== 200) return res.json({ message: 'Invalid code' })
        req.access_token = data.access_token
        next()
      })
      .catch((error) => res.json({ error }))
  },

  FetchDiscord: async (req: any, res: Response, next: NextFunction) => {
    if (!req.access_token) return res.json({ message: 'No access token' })
    axios
      .get('https://discord.com/api/v7/users/@me', {
        headers: {
          Authorization: `Bearer ${req.access_token}`,
        },
      })
      .then(({ data, status }) => {
        if (status !== 200) return res.json({ message: 'Invalid access token' })
        req.discord = data
        next()
      })
      .catch((error) => res.json({ error }))
  },

  FetchDiscordConnections: async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.discord) return res.json({ message: 'No discord data' })
    if (req.discord.code)
      return res.json({
        message: 'No discord code provided',
        code: req.discord.code,
      })
    if (req.discord.id !== req.query.state)
      return res.json({
        message:
          'You are logged into two different Discord accounts - one on the website and one in your app. Log out of the website and try again or try again from the website.',
      })
    axios
      .get('https://discord.com/api/v7/users/@me/connections', {
        headers: {
          Authorization: `Bearer ${req.access_token}`,
        },
      })
      .then(({ data, status }) => {
        if (status !== 200)
          return res.json({ message: 'Failed to get Connections.' })
        req.connections = data
        next()
      })
      .catch((error) => res.json({ error }))
  },

  ValidateSteam: async (req: any, res: Response, next: NextFunction) => {
    const steam = req.connections.find(
      (connection: any) => connection.type === 'steam'
    )
    if (!steam)
      return res.json({
        message:
          'Your steam account does not seem to be linked to discord. Please close this window and step through the instructions again',
      })
    const player = await Player.findOne({ steam: steam.id })
    if (player)
      return res.json({
        message: 'This Steam account is already registered.',
      })
    //  Verify play time on steamapi
    new Player({
      displayname: req.discord.global_name,
      username: req.discord.global_name,
      steam: steam.id,
      discord: req.discord.id,
    })
      .save()
      .then(() => res.json({ message: 'Registration successful' }))
      .catch((error) => res.json({ error }))
  },

  RegisterUser: async (req: any, res: Response, next: NextFunction) => {},
}
