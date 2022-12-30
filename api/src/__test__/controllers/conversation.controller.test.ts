import Logger from '../../utils/logger';
import * as httpStatus from "http-status"
import { beforeAll, describe, expect, jest, test } from "@jest/globals"
import ConversationController from "../../controllers/conversation.controller"
import conversationModel from "../../models/conversation.model"

describe("ConversationController tests", () => {
    let execModelMock, sortModelMock
    const failurePromiseFn = jest.fn().mockImplementation(() => ({ promise: { statusCode: httpStatus.INTERNAL_SERVER_ERROR } }))

    beforeAll(() => {
        execModelMock = jest.fn().mockReturnValue([{ subject: "a" }, { subject: "b" }])
        sortModelMock = jest.fn(() => ({ exec: execModelMock }))
        Logger.error = jest.fn()
        Logger.debug = jest.fn()
    })

    test("GetAllEmails should return OK", async () => {
        conversationModel.find = jest.fn(() => ({ sort: sortModelMock } as any))

        const response = await ConversationController.getAllEmails()
        expect(conversationModel.find).toBeCalled()
        expect(response.statusCode).toEqual(httpStatus.OK)
        expect(response.data.data).toHaveLength(2)
        expect(response.data.data[0]["subject"]).toEqual("a")
    })

    test("GetAllEmails should return INTERNAL_ERROR_SERVER", async () => {
        conversationModel.find = failurePromiseFn as any
        await expect(() => ConversationController.getAllEmails()).rejects.toEqual({
            error: { message: "Request couldn't be fulfilled, Cannot fetch conversation list." },
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        })
        expect(conversationModel.find).toBeCalled()
    })
})
