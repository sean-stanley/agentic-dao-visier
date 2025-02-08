import {
  TokensStaked as TokensStakedEvent,
  ProposalSubmitted as ProposalSubmittedEvent,
  VoteCast as VoteCastEvent,
  SignerAdded as SignerAddedEvent,
  ProposalExecuted as ProposalExecutedEvent,
  MintingSuccess as MintingSuccessEvent,
  BurningSuccess as BurningSuccessEvent,
  TransferSuccess as TransferSuccessEvent
} from "../generated/Contract/Contract"
import {
  TokensStaked,
  ProposalSubmitted,
  VoteCast,
  SignerAdded,
  ProposalExecuted,
  MintingSuccess,
  BurningSuccess,
  TransferSuccess
} from "../generated/schema"

export function handleTokensStaked(event: TokensStakedEvent): void {
  let entity = new TokensStaked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalSubmitted(event: ProposalSubmittedEvent): void {
  let entity = new ProposalSubmitted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposer = event.params.proposer
  entity.proposal_id = event.params.proposal_id
  entity.descriptionHash = event.params.descriptionHash
  entity.action_target = event.params.action_target
  entity.action_payload = event.params.action_payload
  entity.expiryTimestamp = event.params.expiryTimestamp
  entity.description = event.params.description

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteCast(event: VoteCastEvent): void {
  let entity = new VoteCast(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voter = event.params.voter
  entity.proposal_id = event.params.proposal_id
  entity.approve = event.params.approve
  entity.power = event.params.power

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSignerAdded(event: SignerAddedEvent): void {
  let entity = new SignerAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.signer = event.params.signer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalExecuted(event: ProposalExecutedEvent): void {
  let entity = new ProposalExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposal_id = event.params.proposal_id
  entity.target = event.params.target

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMintingSuccess(event: MintingSuccessEvent): void {
  let entity = new MintingSuccess(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBurningSuccess(event: BurningSuccessEvent): void {
  let entity = new BurningSuccess(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferSuccess(event: TransferSuccessEvent): void {
  let entity = new TransferSuccess(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
