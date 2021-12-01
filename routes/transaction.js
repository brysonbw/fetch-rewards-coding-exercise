const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { body } = require('express-validator');

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// add transaction
router.post('/add', [
    // 'payer' validations
    check('payer')
    .isString()
    .withMessage('Please enter a payer as a string')
    .isLength({
        min: 3
    })
    .withMessage('Please enter a payer with 3 or more characters')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Payer must be alphabetic'),
    // 'points' validations
    check('points')
    .isNumeric()
    .withMessage('Please enter points as a number')
    .isInt()
    .withMessage('Points must be an integer')
    .isInt({
        min: 1
    })
    .withMessage('Points must be positive and greater than 0')
],
// convert 'payer' input .toUpperCase()
[body('payer').toUpperCase()], 
async (req, res) => {
    try {
        const { payer, points } = req.body
        const errors = validationResult(req)

        // validate input
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        await prisma.transaction.create({
            data: {
                payer: payer,
                points: points
            }
        })
        res.json(req.body)
    } catch (error) {
        console.log(error)
    }
})


// get all transactions
router.get('/all', async (req, res) => {
    try {
        const transactions = await prisma.transaction.findMany()
        res.json(transactions)
    } catch (error) {
        console.log(error)
    }
})

// spend points from a specific payer transaction byId
router.put('/spendPoints/:id',
[
    check('points')
    .isNumeric()
    .withMessage('Please enter points as a number')
    .isInt()
    .withMessage('Points must be an integer')
    .isInt({
        min: 1
    })
    .withMessage('Points must be positive and greater than 0')
],
async (req, res) => {
    try {
    const { id } = req.params
    const { points } = req.body
    const errors = validationResult(req)

        // validate input
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

    await prisma.$transaction(async (prisma) => {
    const spendPoints = await prisma.transaction.update({
        where: { id: Number(id) },
      data: {
        points: {
          decrement: points
        }},
    })

    if (spendPoints.points < 0) {
      throw new Error, res.json({error: `You don't have enough points available to spend ${points} points`})
    }

    prisma.transaction.update({
        where: {
            id: Number(id)
          },
        data: {
          points: {
            increment: points,
          },
        },
    })
    const payer = spendPoints.payer.toUpperCase()
    return res.json({payer, points: spendPoints.points})
})
    } catch (error) {
        console.log(error)
    }
})


// get the sum of all points for a specific payer
router.get('/payerBalance',
// convert 'payer' input .toUpperCase()
[body('payer').toUpperCase()],
async (req, res) => {
    try {
        const {payer} = req.body
    const groupPayerBalance = await prisma.transaction.groupBy({
        by: ['payer'],
        where: {
          payer: {
            contains: payer,
          },
        },
        _sum: {
          points: true,
        },
      })
    res.json(groupPayerBalance)
    } catch (error) {
        console.log(error)
    }
})


// delete a transaction
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    const deleteTransaction = await prisma.transaction.delete({
      where: { id: Number(id) },
    })
    res.json(`Transaction number ${deleteTransaction.id} was deleted!`)
})



module.exports = router