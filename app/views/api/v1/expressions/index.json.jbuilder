json.array! @expressions do |expression|
  json.extract! expression, :id, :emotion, :confidence
end
