import { equal, ok } from 'assert'
import { JSDOM } from 'jsdom'
import sinon from 'sinon'

import { generateCart, generateName } from '../index.mjs'
import createCartFragment from '../index.mjs'

describe('cart', () => {
    it('generates a name', () => {
        const name = generateName();
        ok(name)
    })
    it('has a valid number of elements', () => {
        const count = generateCart();
        ok(count >= 0)
        ok(count <= 10)
    })
    it('exports a function', () => {
        equal(typeof createCartFragment, 'function')
    })
    describe('createCartFragment', () => {
        it('does invoke functions properly', () => {
            const appendChild = sinon.spy()
            const document = {
                createDocumentFragment: sinon.stub().returns({ appendChild }),
                createElement: sinon.stub().returns({ appendChild })
            }

            createCartFragment(document)

            ok(document.createDocumentFragment.calledOnce)
        })

        it('returns a document fragment', () => {
            const dom = new JSDOM()
            const fragment = createCartFragment(dom.window.document)

            ok(fragment instanceof dom.window.DocumentFragment)
        })
    })
})