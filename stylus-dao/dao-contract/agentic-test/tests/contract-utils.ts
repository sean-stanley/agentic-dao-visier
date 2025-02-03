import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  TokensStaked,
  ProposalSubmitted,
  VoteCast,
  SignerAdded,
  ProposalApproved,
  ProposalExecuted
} from "../generated/Contract/Contract"

export function createTokensStakedEvent(
  sender: Address,
  amount: BigInt
): TokensStaked {
  let tokensStakedEvent = changetype<TokensStaked>(newMockEvent())

  tokensStakedEvent.parameters = new Array()

  tokensStakedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  tokensStakedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokensStakedEvent
}

export function createProposalSubmittedEvent(
  proposer: Address,
  proposal_id: BigInt,
  descriptionHash: Bytes
): ProposalSubmitted {
  let proposalSubmittedEvent = changetype<ProposalSubmitted>(newMockEvent())

  proposalSubmittedEvent.parameters = new Array()

  proposalSubmittedEvent.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  proposalSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "proposal_id",
      ethereum.Value.fromUnsignedBigInt(proposal_id)
    )
  )
  proposalSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "descriptionHash",
      ethereum.Value.fromFixedBytes(descriptionHash)
    )
  )

  return proposalSubmittedEvent
}

export function createVoteCastEvent(
  voter: Address,
  proposal_id: BigInt,
  approve: boolean,
  power: BigInt
): VoteCast {
  let voteCastEvent = changetype<VoteCast>(newMockEvent())

  voteCastEvent.parameters = new Array()

  voteCastEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  voteCastEvent.parameters.push(
    new ethereum.EventParam(
      "proposal_id",
      ethereum.Value.fromUnsignedBigInt(proposal_id)
    )
  )
  voteCastEvent.parameters.push(
    new ethereum.EventParam("approve", ethereum.Value.fromBoolean(approve))
  )
  voteCastEvent.parameters.push(
    new ethereum.EventParam("power", ethereum.Value.fromUnsignedBigInt(power))
  )

  return voteCastEvent
}

export function createSignerAddedEvent(signer: Address): SignerAdded {
  let signerAddedEvent = changetype<SignerAdded>(newMockEvent())

  signerAddedEvent.parameters = new Array()

  signerAddedEvent.parameters.push(
    new ethereum.EventParam("signer", ethereum.Value.fromAddress(signer))
  )

  return signerAddedEvent
}

export function createProposalApprovedEvent(
  signer: Address,
  proposal_id: BigInt
): ProposalApproved {
  let proposalApprovedEvent = changetype<ProposalApproved>(newMockEvent())

  proposalApprovedEvent.parameters = new Array()

  proposalApprovedEvent.parameters.push(
    new ethereum.EventParam("signer", ethereum.Value.fromAddress(signer))
  )
  proposalApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "proposal_id",
      ethereum.Value.fromUnsignedBigInt(proposal_id)
    )
  )

  return proposalApprovedEvent
}

export function createProposalExecutedEvent(
  proposal_id: BigInt,
  target: Address
): ProposalExecuted {
  let proposalExecutedEvent = changetype<ProposalExecuted>(newMockEvent())

  proposalExecutedEvent.parameters = new Array()

  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "proposal_id",
      ethereum.Value.fromUnsignedBigInt(proposal_id)
    )
  )
  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )

  return proposalExecutedEvent
}
