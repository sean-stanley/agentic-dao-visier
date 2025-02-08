import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  TokensStaked,
  ProposalSubmitted,
  VoteCast,
  SignerAdded,
  ProposalApproved,
  ProposalExecuted,
  MintingSuccess,
  ProposalAIUpdated
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
  descriptionHash: Bytes,
  action_target: Address,
  action_payload: Bytes,
  expiryTimestamp: BigInt,
  description: string
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
  proposalSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "action_target",
      ethereum.Value.fromAddress(action_target)
    )
  )
  proposalSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "action_payload",
      ethereum.Value.fromFixedBytes(action_payload)
    )
  )
  proposalSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "expiryTimestamp",
      ethereum.Value.fromUnsignedBigInt(expiryTimestamp)
    )
  )
  proposalSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
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

export function createMintingSuccessEvent(
  to: Address,
  value: BigInt
): MintingSuccess {
  let mintingSuccessEvent = changetype<MintingSuccess>(newMockEvent())

  mintingSuccessEvent.parameters = new Array()

  mintingSuccessEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  mintingSuccessEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return mintingSuccessEvent
}

export function createProposalAIUpdatedEvent(
  proposal_id: BigInt,
  ai_review_hash: Bytes,
  score: i32
): ProposalAIUpdated {
  let proposalAiUpdatedEvent = changetype<ProposalAIUpdated>(newMockEvent())

  proposalAiUpdatedEvent.parameters = new Array()

  proposalAiUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposal_id",
      ethereum.Value.fromUnsignedBigInt(proposal_id)
    )
  )
  proposalAiUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "ai_review_hash",
      ethereum.Value.fromFixedBytes(ai_review_hash)
    )
  )
  proposalAiUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "score",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(score))
    )
  )

  return proposalAiUpdatedEvent
}
